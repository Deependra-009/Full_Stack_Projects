// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { ProductModal } from 'src/app/Shared/Modals/ProductModal';

@Pipe({ name: 'appFilter' })
export class QuerySearchFilterService implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: ProductModal[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.product_title.toLocaleLowerCase().includes(searchText);
    });
  }
}