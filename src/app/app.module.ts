import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WebSpeechComponent } from './component/web-speech/web-speech.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { SpeechRecognizerService } from './services/speech-recognizer.service';
import { SpeechSynthesizerService } from './services/speech-synthesizer.service';
import {MatInputModule, MatButtonModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    WebSpeechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,

  ],
  providers: [SpeechRecognizerService,
    SpeechSynthesizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
