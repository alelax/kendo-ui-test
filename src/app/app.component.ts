import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KENDO_BUTTON, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kendo-ui-test';
  private themeService = inject(ThemeService);

  setDarkModeTheme()
  {
    this.themeService.setDarkMode();
  }

  setLightModeTheme()
  {
    this.themeService.setLightMode();
  }
}
