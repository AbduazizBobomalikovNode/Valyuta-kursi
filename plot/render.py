import plotly.graph_objects as go
import data as db 
import time as t
import json
import sys, os
pathname = os.path.dirname('./') 
src = os.path.abspath(pathname)

date = t.strftime('%Y-%m-%d', t.localtime())

#collors
headerColor = 'grey'
rowEvenColor = 'cadetblue'
rowOddColor = 'wheat'

import dollar
import center_bank
import market
import rubl
import stock_exchange

dollar.work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor)
center_bank.work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor)
market.work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor)
rubl.work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor)
stock_exchange.work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor)