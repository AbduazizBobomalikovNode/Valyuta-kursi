def work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor):
    dataBR = db.get_BR()[0]
    date = t.strftime('%Y-%m-%d', t.localtime())

    def evnt(elm):
      if elm>0:
        return '↗️'
      return '↘️'

    fig = go.Figure(data=[go.Table(
      header=dict(
        values=['<b>Валюта</b>','<b>🇺🇸Доллар</b>','<b>🇪🇺Евро</b>'],
        line_color='darkslategray',
        fill_color=headerColor,
        align=['left','center'],
        font=dict(color='white', size=12)
      ),
      cells=dict(
        values=[
          ['<b>курси</b>', '<b>Янгиланиш</b>'],
          [str(dataBR['USD']['parse'])+' '+evnt(float(dataBR['USD']['situation']))+str(dataBR['USD']['situation']),date],
          [str(dataBR['EUR']['parse'])+' '+evnt(float(dataBR['USD']['situation']))+str(dataBR['EUR']['situation']),date]],
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
        height = 125,
        title_text= str(date) + '__Валюта  биржаси курси__🇺🇿 СберкассаУз :@' + os.environ['NAME_BOT']
    )
    fig.write_image(src + '/images/stock_exchange.jpg')
    print('worked stock_exchange.py')