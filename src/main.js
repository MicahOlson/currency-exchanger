import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './services/exchange-service.js';

function clearPage() {
  $('#base-value').val('');
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
    $('#show-errors').text("Sorry, we don't have your target currency in today's data. Please select a different target and try again.");
    $('#show-errors').show();
  } else if (response.result === 'error') {
    $('#show-errors').text(`Uh, oh! We ran into a problem -> ${response['error-type']}`);
    $('#show-errors').show();
  } else {
    $('#show-errors').text(`Uh, oh! We ran into a problem -> ${response.message}`);
    $('#show-errors').show();
  }
}

$(document).ready(function() {
  $('form#value-and-target').submit(function(event) {
    event.preventDefault();
    const baseCurrency = $('#base-currency').val();
    const baseValue = parseFloat($('#base-value').val());
    const targetCurrency = $('#target-currency').val();
    clearPage();
    ExchangeService.getExchange(baseCurrency, targetCurrency)
      .then(function(response) {
        getResult(response, baseValue);
      });
  });
});