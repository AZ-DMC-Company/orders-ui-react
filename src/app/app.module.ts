import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { OrderService } from './order.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {}