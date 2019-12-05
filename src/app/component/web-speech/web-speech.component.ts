import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognizerService } from 'src/app/services/speech-recognizer.service';
import { SpeechNotification } from 'src/app/model/speech-notification';
import { SpeechError } from 'src/app/model/speech-error';


const INITIAL_INIT_WINDOW = 3000;
const STOP_WINDOW = 500;


@Component({
  selector: 'app-web-speech',
  templateUrl: './web-speech.component.html',
  styleUrls: ['./web-speech.component.css']
})
export class WebSpeechComponent implements OnInit {
  finalTranscript = '';
  recognizing = false;
  notification: string;
  languages: string[] = ['es-ES', 'en-US'];
  currentLanguage: string;
  txt: string;
  myVar: any;
  t0: number = null;
  visible = false;

  constructor(private changeDetector: ChangeDetectorRef, private speechRecognizer: SpeechRecognizerService) {

  }

  ngOnInit() {

    this.currentLanguage = this.languages[0];
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
  }
  startButton(event) {
    this.finalTranscript = '';
    if (this.recognizing)  {

      this.speechRecognizer.stop();

      return;
    }

    this.speechRecognizer.start(event.timeStamp);
    this.t0 = Date.now();
    setTimeout(() => onNoData(this, true), INITIAL_INIT_WINDOW);

  }

  onSelectLanguage(language: string) {
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        this.t0 =  Date.now();
        setTimeout(() => onNoData(this, false), STOP_WINDOW);

        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          this.detectChanges();
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  stop() {
    this.speechRecognizer.stop();
  }

}

function onNoData(that: WebSpeechComponent, isInitial: boolean): void {
  const t1 = Date.now();
  const ellapsed = t1 - that.t0;

  if ((isInitial && ellapsed > INITIAL_INIT_WINDOW) ||
      (!isInitial && ellapsed > STOP_WINDOW)) {
    console.log('auto-stop');
    that.stop();
  }



}
