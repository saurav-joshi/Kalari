import csv

class MetaCSV(type):
    def __new__(cls, name, bases, attrs):
        attrs["field_names"] = []
        for key, value in attrs.items():
            if isinstance(value, tuple):
                attrs["field_names"].append(key)
        return type.__new__(cls, name, bases, attrs)

class CSV(metaclass=MetaCSV):
    def __init__(self, filename):
        self.filename = filename
        self.csv_reader = csv.DictReader(open(self.filename))
        self.data = []
        self.clean_data()

    def clean_data(self):
        for row in self.csv_reader:
            cleaned_row = {}
            for field in self.field_names:
                cleaned_row[field] = self.clean_field(field, row[field])
            self.data.append(cleaned_row)

    def clean_field(self, field, value):
        cleaning_func = self.field_cleaning_funcs.get(field)
        if cleaning_func:
            return cleaning_func(value)
        else:
            pass

class UserCSV(CSV):
    id = (int, True)
    name = (str, False)
    email = (str, True)

    field_cleaning_funcs = {
        "id": int,
        "name": str.title,
        "email": str.lower,
    }

class ProductCSV(CSV):
    id = (int, True)
    name = (str, True)
    price = (float, True)

    field_cleaning_funcs = {
        "id": int,
        "name": str.upper,
        "price": float,
    }

users = UserCSV("Students.csv")
# products = ProductCSV("products.csv")
