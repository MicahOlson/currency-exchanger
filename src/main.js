import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './services/exchange-service.js';

function clearPage() {
  $('#base-value').val('');
  $('#base-currency').val('');
  $('#target-currency').val('');
  $('#results').hide();
  $('#rates').hide();
  $('#show-errors').hide();
}

function getResult(response, baseValue) {
  if (response.result === 'success') {
    const conversion = (baseValue * response.conversion_rate).toFixed(2);
    $('#base-result').text(`${baseValue.toFixed(2)} ${response.base_code} = `);
    $('#target-result').text(`${conversion} ${response.target_code}`);
    $('#conversion-rate').text(`1 ${response.base_code} = ${response.conversion_rate.toFixed(4)} ${response.target_code}`);
    $('#reverse-rate').text(`1 ${response.target_code} = ${(1 / response.conversion_rate).toFixed(4)} ${response.base_code}`);
    $('#results').show();
    $('#rates').show();
  } else if (response['error-type'] === 'unsupported-code') {
    $('#show-errors').text("Sorry, we don't have this exchange in today's data. Please select different currencies and try again.");
    $('#show-errors').show();
  } else if (response.result === 'error') {
    $('#show-errors').text(`Uh, oh - we ran into a problem! -> ${response['error-type']}`);
    $('#show-errors').show();
  } else {
    $('#show-errors').text(`Uh, oh - we ran into a problem! -> ${response.message}`);
    $('#show-errors').show();
  }
}

function makeSelectBoxes() {
  const supportedCurrencies = {
    'USD': ['United States Dollar', 'United States'],
    'AED': ['UAE Dirham', 'United Arab Emirates'],
    'AFN': ['Afghan Afghani', 'Afghanistan'],
    'ALL': ['Albanian Lek', 'Albania'],
    'AMD': ['Armenian Dram', 'Armenia'],
    'ANG': ['Netherlands Antillian Guilder', 'Netherlands Antilles'],
    'AOA': ['Angolan Kwanza', 'Angola'],
    'ARS': ['Argentine Peso', 'Argentina'],
    'AUD': ['Australian Dollar', 'Australia'],
    'AWG': ['Aruban Florin', 'Aruba'],
    'AZN': ['Azerbaijani Manat', 'Azerbaijan'],
    'BAM': ['Bosnia and Herzegovina Mark', 'Bosnia and Herzegovina'],
    'BBD': ['Barbados Dollar', 'Barbados'],
    'BDT': ['Bangladeshi Taka', 'Bangladesh'],
    'BGN': ['Bulgarian Lev', 'Bulgaria'],
    'BHD': ['Bahraini Dinar', 'Bahrain'],
    'BIF': ['Burundian Franc', 'Burundi'],
    'BMD': ['Bermudian Dollar', 'Bermuda'],
    'BND': ['Brunei Dollar', 'Brunei'],
    'BOB': ['Bolivian Boliviano', 'Bolivia'],
    'BRL': ['Brazilian Real', 'Brazil'],
    'BSD': ['Bahamian Dollar', 'Bahamas'],
    'BTN': ['Bhutanese Ngultrum', 'Bhutan'],
    'BWP': ['Botswana Pula', 'Botswana'],
    'BYN': ['Belarusian Ruble', 'Belarus'],
    'BZD': ['Belize Dollar', 'Belize'],
    'CAD': ['Canadian Dollar', 'Canada'],
    'CDF': ['Congolese Franc', 'Democratic Republic of the Congo'],
    'CHF': ['Swiss Franc', 'Switzerland'],
    'CLP': ['Chilean Peso', 'Chile'],
    'CNY': ['Chinese Renminbi', 'China'],
    'COP': ['Colombian Peso', 'Colombia'],
    'CRC': ['Costa Rican Colon', 'Costa Rica'],
    'CUC': ['Cuban Convertible Peso', 'Cuba'],
    'CUP': ['Cuban Peso', 'Cuba'],
    'CVE': ['Cape Verdean Escudo', 'Cape Verde'],
    'CZK': ['Czech Koruna', 'Czech Republic'],
    'DJF': ['Djiboutian Franc', 'Djibouti'],
    'DKK': ['Danish Krone', 'Denmark'],
    'DOP': ['Dominican Peso', 'Dominican Republic'],
    'DZD': ['Algerian Dinar', 'Algeria'],
    'EGP': ['Egyptian Pound', 'Egypt'],
    'ERN': ['Eritrean Nakfa', 'Eritrea'],
    'ETB': ['Ethiopian Birr', 'Ethiopia'],
    'EUR': ['Euro', 'European Union'],
    'FJD': ['Fiji Dollar', 'Fiji'],
    'FKP': ['Falkland Islands Pound', 'Falkland Islands'],
    'FOK': ['Faroese Króna', 'Faroe Islands'],
    'GBP': ['Pound Sterling', 'United Kingdom'],
    'GEL': ['Georgian Lari', 'Georgia'],
    'GGP': ['Guernsey Pound', 'Guernsey'],
    'GHS': ['Ghanaian Cedi', 'Ghana'],
    'GIP': ['Gibraltar Pound', 'Gibraltar'],
    'GMD': ['Gambian Dalasi', 'The Gambia'],
    'GNF': ['Guinean Franc', 'Guinea'],
    'GTQ': ['Guatemalan Quetzal', 'Guatemala'],
    'GYD': ['Guyanese Dollar', 'Guyana'],
    'HKD': ['Hong Kong Dollar', 'Hong Kong'],
    'HNL': ['Honduran Lempira', 'Honduras'],
    'HRK': ['Croatian Kuna', 'Croatia'],
    'HTG': ['Haitian Gourde', 'Haiti'],
    'HUF': ['Hungarian Forint', 'Hungary'],
    'IDR': ['Indonesian Rupiah', 'Indonesia'],
    'ILS': ['Israeli New Shekel', 'Israel'],
    'IMP': ['Manx Pound', 'Isle of Man'],
    'INR': ['Indian Rupee', 'India'],
    'IQD': ['Iraqi Dinar', 'Iraq'],
    'IRR': ['Iranian Rial', 'Iran'],
    'ISK': ['Icelandic Króna', 'Iceland'],
    'JMD': ['Jamaican Dollar', 'Jamaica'],
    'JOD': ['Jordanian Dinar', 'Jordan'],
    'JPY': ['Japanese Yen', 'Japan'],
    'KES': ['Kenyan Shilling', 'Kenya'],
    'KGS': ['Kyrgyzstani Som', 'Kyrgyzstan'],
    'KHR': ['Cambodian Riel', 'Cambodia'],
    'KID': ['Kiribati Dollar', 'Kiribati'],
    'KMF': ['Comorian Franc', 'Comoros'],
    'KRW': ['South Korean Won', 'South Korea'],
    'KWD': ['Kuwaiti Dinar', 'Kuwait'],
    'KYD': ['Cayman Islands Dollar', 'Cayman Islands'],
    'KZT': ['Kazakhstani Tenge', 'Kazakhstan'],
    'LAK': ['Lao Kip', 'Laos'],
    'LBP': ['Lebanese Pound', 'Lebanon'],
    'LKR': ['Sri Lanka Rupee', 'Sri Lanka'],
    'LRD': ['Liberian Dollar', 'Liberia'],
    'LSL': ['Lesotho Loti', 'Lesotho'],
    'LYD': ['Libyan Dinar', 'Libya'],
    'MAD': ['Moroccan Dirham', 'Morocco'],
    'MDL': ['Moldovan Leu', 'Moldova'],
    'MGA': ['Malagasy Ariary', 'Madagascar'],
    'MKD': ['Macedonian Denar', 'North Macedonia'],
    'MMK': ['Burmese Kyat', 'Myanmar'],
    'MNT': ['Mongolian Tögrög', 'Mongolia'],
    'MOP': ['Macanese Pataca', 'Macau'],
    'MRU': ['Mauritanian Ouguiya', 'Mauritania'],
    'MUR': ['Mauritian Rupee', 'Mauritius'],
    'MVR': ['Maldivian Rufiyaa', 'Maldives'],
    'MWK': ['Malawian Kwacha', 'Malawi'],
    'MXN': ['Mexican Peso', 'Mexico'],
    'MYR': ['Malaysian Ringgit', 'Malaysia'],
    'MZN': ['Mozambican Metical', 'Mozambique'],
    'NAD': ['Namibian Dollar', 'Namibia'],
    'NGN': ['Nigerian Naira', 'Nigeria'],
    'NIO': ['Nicaraguan Córdoba', 'Nicaragua'],
    'NOK': ['Norwegian Krone', 'Norway'],
    'NPR': ['Nepalese Rupee', 'Nepal'],
    'NZD': ['New Zealand Dollar', 'New Zealand'],
    'OMR': ['Omani Rial', 'Oman'],
    'PAB': ['Panamanian Balboa', 'Panama'],
    'PEN': ['Peruvian Sol', 'Peru'],
    'PGK': ['Papua New Guinean Kina', 'Papua New Guinea'],
    'PHP': ['Philippine Peso', 'Philippines'],
    'PKR': ['Pakistani Rupee', 'Pakistan'],
    'PLN': ['Polish Złoty', 'Poland'],
    'PYG': ['Paraguayan Guaraní', 'Paraguay'],
    'QAR': ['Qatari Riyal', 'Qatar'],
    'RON': ['Romanian Leu', 'Romania'],
    'RSD': ['Serbian Dinar', 'Serbia'],
    'RUB': ['Russian Ruble', 'Russia'],
    'RWF': ['Rwandan Franc', 'Rwanda'],
    'SAR': ['Saudi Riyal', 'Saudi Arabia'],
    'SBD': ['Solomon Islands Dollar', 'Solomon Islands'],
    'SCR': ['Seychellois Rupee', 'Seychelles'],
    'SDG': ['Sudanese Pound', 'Sudan'],
    'SEK': ['Swedish Krona', 'Sweden'],
    'SGD': ['Singapore Dollar', 'Singapore'],
    'SHP': ['Saint Helena Pound', 'Saint Helena'],
    'SLL': ['Sierra Leonean Leone', 'Sierra Leone'],
    'SOS': ['Somali Shilling', 'Somalia'],
    'SRD': ['Surinamese Dollar', 'Suriname'],
    'SSP': ['South Sudanese Pound', 'South Sudan'],
    'STN': ['São Tomé and Príncipe Dobra', 'São Tomé and Príncipe'],
    'SYP': ['Syrian Pound', 'Syria'],
    'SZL': ['Eswatini Lilangeni', 'Eswatini'],
    'THB': ['Thai Baht', 'Thailand'],
    'TJS': ['Tajikistani Somoni', 'Tajikistan'],
    'TMT': ['Turkmenistan Manat', 'Turkmenistan'],
    'TND': ['Tunisian Dinar', 'Tunisia'],
    'TOP': ['Tongan Paʻanga', 'Tonga'],
    'TRY': ['Turkish Lira', 'Turkey'],
    'TTD': ['Trinidad and Tobago Dollar', 'Trinidad and Tobago'],
    'TVD': ['Tuvaluan Dollar', 'Tuvalu'],
    'TWD': ['New Taiwan Dollar', 'Taiwan'],
    'TZS': ['Tanzanian Shilling', 'Tanzania'],
    'UAH': ['Ukrainian Hryvnia', 'Ukraine'],
    'UGX': ['Ugandan Shilling', 'Uganda'],
    'UYU': ['Uruguayan Peso', 'Uruguay'],
    'UZS': ['Uzbekistani So\'m', 'Uzbekistan'],
    'VES': ['Venezuelan Bolívar Soberano', 'Venezuela'],
    'VND': ['Vietnamese Đồng', 'Vietnam'],
    'VUV': ['Vanuatu Vatu', 'Vanuatu'],
    'WST': ['Samoan Tālā', 'Samoa'],
    'XAF': ['Central African CFA Franc', 'CEMAC'],
    'XCD': ['East Caribbean Dollar', 'Organisation of Eastern Caribbean States'],
    'XDR': ['Special Drawing Rights', 'International Monetary Fund'],
    'XOF': ['West African CFA franc', 'CFA'],
    'XPF': ['CFP Franc', 'Collectivités d\'Outre-Mer'],
    'YER': ['Yemeni Rial', 'Yemen'],
    'ZAR': ['South African Rand', 'South Africa'],
    'ZMW': ['Zambian Kwacha', 'Zambia']
  };
  for (const currencyCode in supportedCurrencies) {
    $('select').append(`<option value="${currencyCode}">${currencyCode} - ${supportedCurrencies[currencyCode][0]}</option>`);
  }
}

$(document).ready(function() {
  makeSelectBoxes();
  $('form#value-and-target').submit(function(event) {
    event.preventDefault();
    const baseCurrency = $('#base-currency').val();
    const baseValue = parseFloat($('#base-value').val());
    const targetCurrency = $('#target-currency').val();
    clearPage();
    if (!sessionStorage[`${baseCurrency}->${targetCurrency}`]) {
      ExchangeService.getExchange(baseCurrency, targetCurrency)
        .then(function(response) {
          sessionStorage.setItem(`${response.base_code}->${response.target_code}`, JSON.stringify(response));
          getResult(response, baseValue);
        });
    } else {
      getResult(JSON.parse(sessionStorage.getItem(`${baseCurrency}->${targetCurrency}`)), baseValue);
    }
  });
});