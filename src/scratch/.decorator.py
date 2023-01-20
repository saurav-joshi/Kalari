def clean_arg(arg):
    # Clean up the input argument and return the result
    if isinstance(arg, str):
        return arg.strip()
    elif isinstance(arg, (int, float)):
        return arg
    else:
        raise ValueError("Invalid argument type")

def clean_input(func):
    def wrapper(*args, **kwargs):
        # Clean up the input arguments
        cleaned_args = [clean_arg(arg) for arg in args]
        cleaned_kwargs = {k: clean_arg(v) for k, v in kwargs.items()}
        # Call the decorated function with the cleaned arguments
        return func(*cleaned_args, **cleaned_kwargs)
    return wrapper

@clean_input
def my_function(a, b, c):
    # Function code goes here
    pass
