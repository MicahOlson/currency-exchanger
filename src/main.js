import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './services/exchange-service.js';

function clearPage() {
  $('#base-value').val('');
  $('#target-currency').val('');
  $('.jumbotron').hide();
}

function getResult(response, baseValue) {
  if (response.result === 'success') {
    const convertedValue = (baseValue * response.conversion_rate).toFixed(2);
    $('#result').text(`${response.base_code} ${baseValue.toFixed(2)} = ${response.target_code} ${convertedValue}`);
  } else if (response['error-type'] === 'unsupported-code') {
    $('#result').text("Sorry, we don't have your target currency in today's data. Please select a different target and try again.");
  } else if (response.result === 'error') {
    $('#result').text(`Uh, oh! We ran into a problem -> ${response['error-type']}`);
  } else {
    $('#result').text(`Uh, oh! We ran into a problem -> ${response.message}`);
  }
}

$(document).ready(function() {
  $('form#value-and-target').submit(function(event) {
    event.preventDefault();
    const baseCurrency = 'USD';
    const baseValue = parseFloat($('#base-value').val());
    const targetCurrency = $('#target-currency').val();
    clearPage();
    ExchangeService.getExchange(baseCurrency, targetCurrency)
      .then(function(response) {
        getResult(response, baseValue);
      });
    $('.jumbotron').show();
  });
});