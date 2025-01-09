from sheetsScript import InventoryManager
import gptApi

credentials_path = 'C:/Users/LEGION/Downloads/Storage-PERMIAS/StorageBuatInven/Back-End/credentials.json'
inventory = InventoryManager(credentials_path)
inventory.updateInventory(gptApi.getSheetInput("Put in 20 bars of Paramount Chocoolate into my inventory"))


