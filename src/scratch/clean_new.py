import csv
import re


class CSVCleaner(type):
    def __new__(cls, name, bases, attrs):
        def clean(self):
            with open("Students.csv","r") as f:
                reader = csv.reader(f)
                
                schema = next(reader)
                
                cleaned_rows = []
                
                
                for row in reader:
                    cleaned_row = []
                    for i, col in enumerate(row):
                        
                        if schema[i] == 'name':
                            
                            cleaned_col = clean_function_1(col)
                        elif schema[i] == 'first_name':
                            
                            cleaned_col = clean_function_2(col)
                        
                        cleaned_row.append(cleaned_col)
                    
                    
                    cleaned_rows.append(cleaned_row)
                
                
                with open("Students.csv", "r") as f:
                    writer = csv.writer(f)
                    writer.writerows(cleaned_rows)
                    
       
        attrs['clean'] = clean
        return super().__new__(cls, name, bases, attrs)

class MyCSV(metaclass=CSVCleaner):
    def __init__(self, filename):
        self.filename = filename

new_csv = MyCSV('Students.csv')
new_csv.clean()


def clean_function_1(value):
    
    return value.strip().capitalize()

def clean_function_2(value):
    
    return value.strip().lower()

def clean_function_3(value):
    return re.sub(r'[^0-9]', '', value.strip())