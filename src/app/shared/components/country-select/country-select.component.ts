import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Country } from 'src/app/interfaces/country';


@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  standalone: false
})
export class CountrySelectComponent implements OnInit {
  @Input() label: string = 'País';
  @Input() placeholder: string = 'Selecciona un país';
  @Input() selectedCountry: Country | null = null;
  @Input() countries: Country[] = [];
  @Input() showSearch: boolean = true;

  @Output() countryChange = new EventEmitter<Country>();

  isOpen: boolean = false;
  isFocused: boolean = false;
  searchTerm: string = '';
  filteredCountries: Country[] = [];

  ngOnInit() {
    this.filteredCountries = [...this.countries];
  }

  openSelection() {
    this.isOpen = !this.isOpen;
    this.isFocused = this.isOpen;

    if (this.isOpen) {
      this.filterCountries();
    }
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.countryChange.emit(country);
    this.isOpen = false;
    this.isFocused = false;
  }

  filterCountries() {
    if (!this.searchTerm) {
      this.filteredCountries = [...this.countries];
    } else {
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  isSelected(country: Country): boolean {
    return this.selectedCountry?.iso2 === country.iso2;
  }

  // Método para establecer el país programáticamente
  setCountry(country: Country): void {
    this.selectedCountry = country;
  }

  // Método para limpiar la selección
  clearSelection(): void {
    this.selectedCountry = null;
    this.searchTerm = '';
    this.filterCountries();
  }
}
