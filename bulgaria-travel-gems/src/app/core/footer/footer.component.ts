import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  footerVisible = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkFooterVisibility();
      });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkFooterVisibility();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkFooterVisibility();
  }

  private checkFooterVisibility() {
    const contentHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const bottomOfPage = contentHeight - viewportHeight;
    const scrolled = window.scrollY;

    this.footerVisible =
      contentHeight <= viewportHeight
        ? scrolled >= bottomOfPage
        : scrolled + viewportHeight >= contentHeight;
  }
}
