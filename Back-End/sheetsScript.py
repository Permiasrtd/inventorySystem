import gspread
from oauth2client.service_account import ServiceAccountCredentials

class InventoryManager:
    def __init__(self, credentials_path):
        self.scope = ["https://spreadsheets.google.com/feeds", 
                     "https://www.googleapis.com/auth/drive"]
        self.credentials_path = credentials_path
        self.client = None
        self.sheet = None
        self.connect()

    def test(self):
        print(self.sheet.find("d"))

    def connect(self):
        creds = ServiceAccountCredentials.from_json_keyfile_name(self.credentials_path, self.scope)
        self.client = gspread.authorize(creds)
        self.sheet = self.client.open("Inventory").sheet1

    def updateInventory(self, data):
        try:
            action = data["Action"]
            item = data["Item"]
            quantity = int(data["Quantity"])

            if action == "Add":
                self.addItem(item, quantity)
            elif action == "Remove":
                self.removeItem(item, quantity)
            else:
                raise ValueError(f"Invalid action: {action}")

        except Exception as e:
            raise Exception(f"Failed to update inventory because of {str(e)}")

    def addItem(self, item, quantity):
        all_values = self.sheet.get_all_values()
        if not all_values:
            self.sheet.append_row([item, quantity])
            return
        
        cell = self.sheet.find(item)
        if cell == None:
            self.sheet.append_row([item, quantity])
        else:
            currentQuantity = int(self.sheet.cell(cell.row, cell.col + 1).value)
            self.sheet.update_cell(cell.row, cell.col + 1, currentQuantity + quantity)


    def removeItem(self, item, quantity):
        cell = self.sheet.find(item)
        if cell == None:
            print(f"Item {item} not found")
        else:
            current_quantity = int(self.sheet.cell(cell.row, cell.col + 1).value)
            new_quantity = max(0, current_quantity - quantity)
            
            if new_quantity > 0:
                self.sheet.update_cell(cell.row, cell.col + 1, new_quantity)
            else:
                self.sheet.delete_rows(cell.row)

    
