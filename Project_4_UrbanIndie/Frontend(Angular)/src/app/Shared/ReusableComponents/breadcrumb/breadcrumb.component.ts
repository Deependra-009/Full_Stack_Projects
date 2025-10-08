import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { BreadcrumbItem } from '../../Modals/Bredcrumb';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  breadcrumbs: BreadcrumbItem[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.generateBreadcrumbs();
}
private generateBreadcrumbs(): void {
  this.route.url.subscribe(segments => {
    let breadcrumbSegments = segments.map(segment => ({
      label: this.titleCase(segment.path),
      url: `/${segment.path}`
    }));

    // Checking if the first segment matches a category, e.g., men, women, kid
    if (breadcrumbSegments.length > 0) {
      const firstSegment = breadcrumbSegments[0].label.toLowerCase();
      const categories = ['men', 'women', 'kid'];

      if (categories.includes(firstSegment)) {
        // Modify the URL for categories
        breadcrumbSegments[0].url = `/${firstSegment}-page`;
      }
    }

    // Combine subcategory segments into a single URL
    if (breadcrumbSegments.length > 1) {
      breadcrumbSegments[1].url = `/${breadcrumbSegments[0].label.toLowerCase()}/${breadcrumbSegments[1].label.toLowerCase()}`;
    }

    this.breadcrumbs = breadcrumbSegments;
  });
}

titleCase(str: string): string {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


}
