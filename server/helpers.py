def validate_not_blank(value, field_name):
    if not value:
        raise ValueError(f"The {field_name} must not be blank.")
    if isinstance(value, str) and value.isspace():
        raise ValueError(f"The {field_name} must not be empty or just whitespace.")
    return value


def validate_positive_number(value, field_name):
    if value < 0:
        raise ValueError(f"The {field_name} must not be negative.")
    return value


def validate_type(value, field_name, expected_type):
    if not isinstance(value, expected_type):
        try:
            value = expected_type(value)
        except (ValueError, TypeError):
            raise ValueError(
                f"The {field_name} must be of type {expected_type.__name__}."
            )
    return value


def dollar_to_cents(dollar_amount):
    try:
        # Check if the input is already an integer
        if isinstance(dollar_amount, int):
            return dollar_amount * 100
        # Convert to float for string or float inputs, then to int
        return int(float(dollar_amount) * 100)
    except ValueError:
        raise ValueError(f"Invalid dollar amount: {dollar_amount}")


def cents_to_dollar(cents):
    return f"${cents / 100:.2f}"


def normalize_price_input(price_input):
    return dollar_to_cents(price_input)
