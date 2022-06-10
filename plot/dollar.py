def work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor):
    dataBR = db.get_USD()[0]
    get = json.loads(dataBR['get'])
    sell = json.loads(dataBR['sell'])
    for x in get:
        get[get.index(x)] = x.strip()
    for x in sell:
        sell[sell.index(x)] = x.strip()



    def getBank():
      lis = []
      i=0
      while(i<len(get)):
        lis.append(get[i])
        i=i+2
      return lis
    bank = getBank()
    def getV():
      lis = []
      for i in bank:
        lis.append(get[get.index(i)+1])
      return lis

    def sellV():
      lis = []
      for i in bank:
        lis.append(sell[sell.index(i)+1])
      return lis

    def times():
      lis = []
      i=0
      while(i<len(get)/2):
        lis.append(date)
        i=i+1
      return lis




    fig = go.Figure(data=[go.Table(
      header=dict(
        values=['<b>БАНК</b>','<b>ОЛИШ</b>','<b>СОТИШ</b>','<b>ЯНГИЛАНИШ</b>'],
        line_color='darkslategray',
        fill_color=headerColor,
        align=['left','center'],
        font=dict(color='white', size=12)
      ),
      cells=dict(
        values=[
          bank,
          getV(),
          sellV(),
          times()],
        line_color='darkslategray',
        # 2-D list of colors for alternating rows
        fill_color = [[rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor]*5],
        align = ['left', 'center'],
        font = dict(color = 'darkslategray', size = 11)
        ))
    ])

    fig.update_layout(
        autosize=False,
        margin = {'l':5,'r':5,'t':35,'b':5},
        height = 500,
        title_text= str(date) + '__Тижорат банклар курси__🇺🇿 СберкассаУз :@' + os.environ['NAME_BOT']
    )
    fig.write_image(src+'/images/dollar.jpg')
    print('worked dollar.py') 