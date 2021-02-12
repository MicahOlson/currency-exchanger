import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './services/exchange-service.js';

function clearFields() {
  $('#base-value').val('');
  $('#target-currency').val('');
}

function getResult(response, baseValue) {
  if (response.result === 'success') {
    const convertedValue = (baseValue * response.conversion_rate).toFixed(2);
    $('#result').text(`${response.base_code} ${baseValue.toFixed(2)} = ${response.target_code} ${convertedValue}`);
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
    clearFields();
    ExchangeService.getExchange(baseCurrency, targetCurrency)
      .then(function(response) {
        getResult(response, baseValue);
      });
  });
});