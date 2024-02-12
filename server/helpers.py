def validate_not_blank(value, field_name):
    if not value:
        raise ValueError(f"The {field_name} must not be blank.")
    if isinstance(value, str) and value.isspace():
        raise ValueError(f"The {field_name} must not be empty or just whitespace.")
    return value


# def validate_positive_number(value, field_name):
#     if value < 0:
#         raise ValueError(f"The {field_name} must not be negative.")
#     return value


def validate_type(value, field_name, expected_type):
    if not isinstance(value, expected_type):
        try:
            value = expected_type(value)
        except (ValueError, TypeError):
            raise ValueError(
                f"The {field_name} must be of type {expected_type.__name__}."
            )
    return value


# def cents_to_dollar(cents):
#     return f"${cents / 100:.2f}"
