import os
import re
import json
import datetime
import requests
from lxml import html
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/upload', methods=['POST'])
def fileUpload():
    bonds = []

    req_data = re.split('\n', request.json['csv'])

    for req in req_data:
        req_row = re.split(',', req)
        bonds.append(req_row)

    dt = datetime.datetime.today()

    this_month = dt.month
    this_year = dt.year

    lookup_date = str(this_month) + "/" + str(this_year)

    url = 'https://www.treasurydirect.gov/BC/SBCPrice'

    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Content-Length": "438",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "BIGipServer2oYhSIJ6gDvVcAXPpNY3ew=!0jJZbL8L5i8ohZS9hYzHeep4jQdnEk1YDZwNR+x3mdF5S7J9CyfH0XAxGZ5bW/RAF/uNwpNYpJ0OXxY=; TS019fc7a5=019e2ba2e94aded09e1420bbe461a47b8858c2ae3c2d5b85e1a8bcc8cd5f652f56a3d68d5a0032236f195fed303c71e4441ce093df",
        "Host": "www.treasurydirect.gov",
        "Origin": "https://www.treasurydirect.gov",
        "Referer": "https://www.treasurydirect.gov/BC/SBCPrice",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
    }

    bond_dict = {}
    bond_results = []
    bond_amount_totals = []
    bond_price_totals = []
    bond_value_totals = []

    for bond_amount, serial_number, issue_month, issue_year in bonds:
        results = []

        data = "RedemptionDate=" + str(this_month) + "%2F" + str(this_year) + "&Series=EE&Denomination=" + bond_amount + "&SerialNumber=" + serial_number + "&IssueDate=" + issue_month + "%2F" + issue_year + \
            "&btnAdd.x=CALCULATE&SerialNumList=&IssueDateList=&SeriesList=&DenominationList=&IssuePriceList=&InterestList=&YTDInterestList=&ValueList=&InterestRateList=&NextAccrualDateList=&MaturityDateList=&NoteList=&OldRedemptionDate=782&ViewPos=0&ViewType=Partial&Version=6"

        post = requests.post(url, headers=headers, data=data)

        response = html.fromstring(post.text)

        row = response.xpath(
            '//table[@class="bnddata"]/tbody/tr[@class="altrow1"]/td//text()')[0:-1]

        results.append(lookup_date)

        for cell in row:
            results.append(cell)

        bond_value_totals.append(float(results[10][1::]))
        bond_amount_totals.append(float(results[3][1::]))
        bond_price_totals.append(float(results[7][1::]))

        bond_results.append(results)

    bond_dict['results'] = bond_results
    bond_dict['totals'] = ['${:,.2f}'.format(sum(bond_value_totals)), '${:,.2f}'.format(sum(bond_amount_totals)), '${:,.2f}'.format(
        sum(bond_price_totals))]

    return json.dumps(bond_dict)


if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True, host="localhost")
