def work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor):
    dataBR = db.get_BN()[0]
    usd = dataBR['USD']
    rubl = dataBR['RUB']

    fig = go.Figure(data=[go.Table(
      header=dict(
        values=['<b>Валюта</b>','<b>💲Долар</b>','<b>🇷🇺Рубл</b>'],
        line_color='darkslategray',
        fill_color=headerColor,
        align=['left','center'],
        font=dict(color='white', size=12)
      ),
      cells=dict(
        values=[
          ['ОЛИШ','СОТИШ','ЯНГИЛАНИШ'],
          [usd['get'],usd['sell'],date],
          [rubl['get'],rubl['sell'],date]],
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
        height = 135,
        title_text= str(date) + '__Норасмий Бозор курси___🇺🇿 СберкассаУз :@' + os.environ['NAME_BOT']
    )
    fig.write_image(src + '/images/market.jpg')
    print('worked market.py')