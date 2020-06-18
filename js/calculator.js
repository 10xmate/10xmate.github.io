(function($) {
    'use strict';
        $('#result-bar').hide();
        $('#explain-bar').hide();

        var numberFormatter = function(number) {
            var parts = number.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return parts.join(".") + ' €';
        }

        var calc_service_price = function (number_employees) {
            if (number_employees <= 49) {
                return 7;
            }

            if (number_employees <= 199) {
                return 6;
            }

            if (number_employees <= 399) {
                return 5.5;
            }

            if (number_employees <= 599) {
                return 5;
            }

            if (number_employees <= 799) {
                return 4.5;
            }

            if (number_employees >= 800) {
                return 4;
            }
        }

        // validations start here
        $('#calculator_form').validate({

            rules: {

                total_n_emp: {
                    required: true
                },
                yearly_pay: {
                    required: true
                },
                onboarding_period: {
                    required: true,
                    min: 1
                },
                num_emp_who_quit_per_year: {
                    required: true
                }
            },

            messages: {

                total_n_emp: {
                    required: 'The field is required.'
                },
                yearly_pay: {
                    required: 'The field is required.'
                },
                onboarding_period: {
                    required: 'The field is required.',
                    min: 'The value could not be smaller than 1.'
                },
                num_emp_who_quit_per_year: {
                    required: 'The field is required.'
                }
            },

            submitHandler: function() {

                var total_n_emp = $('#total_n_emp');
                var yearly_pay = $('#yearly_pay');
                var onboarding_period = $('#onboarding_period');

                var num_emp_who_quit_per_year = $('#num_emp_who_quit_per_year');
                var training_cost = $('#training_cost');
                var training_cost_saved = $('#training_cost_saved');

                $('#error_message').html('');

                $('#result-bar').show();
                $('#explain-bar').delay(1000).show('slow');

                var val_training_cost = num_emp_who_quit_per_year.val() * onboarding_period.val() * (yearly_pay.val() / 12);

                var val_training_cost_saving = val_training_cost * 31/100;

                $('#training-cost').html(numberFormatter(val_training_cost.toFixed(2)));
                $('#training-cost-saving').html(numberFormatter(val_training_cost_saving.toFixed(2)));

                var service_yearly_price = total_n_emp.val() * calc_service_price(total_n_emp.val()) * 12;

                $('#calc-price').html(' <b>' + numberFormatter(service_yearly_price) + '</b>');
            }
        });
}(jQuery));
