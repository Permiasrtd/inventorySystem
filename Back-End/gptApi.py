import openai
import json

openai.api_key = '.'

def getStructuredInput(transcript):
    system_message = (
        "You are a helpful AI assistant. Your task is to help me format a user's input in terms of JSON objects for a storage system recorded on a spreadsheet.\n"
        "A user can either ADD items into the storage system or REMOVE items."
        f"For example, if you receive input like \'I want uhh to input 9 apples.\', respond with {{\"Action\":\"Add\",\"Item\":\"Apple\",\"Quantity\":\"9\"}}"
        "More examples:\n"
        f"Input: Store 4 pineapples... wait I meant watermelons. Your response: {{\"Action\":\"Add\",\"Item\":\"Watermelon\",\"Quantity\":\"4\"}}"
        f"Input: Remove 3 pineapples... wait I meant Cherries. Your response: {{\"Action\":\"Remove\",\"Item\":\"Cherry\",\"Quantity\":\"3\"}}"
        "Make the item singular"
    )

    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": transcript}
        ],
        max_tokens=150,
        temperature=0.7,
    )

    generated_text = response.choices[0].message.content.strip()
    return generated_text


def getSheetInput(transcript):
    gpt_response = getStructuredInput(transcript)

    try:
        structured_data = json.loads(gpt_response)
        return structured_data
    except json.JSONDecodeError as e:
        print("Error parsing AI response to JSON:", e)
        return None
