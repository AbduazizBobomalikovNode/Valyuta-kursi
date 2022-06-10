def work(go,db,date,t,json,src,os,headerColor,rowEvenColor,rowOddColor):
    dataBR = db.get_MB()[0]['currency']
    data = json.loads(dataBR);

    code = {'USD':'💲','EUR':'💶','RUB':'🇷🇺','CNY':'🇨🇳'}
    def evnt(elm):
      if elm>0:
        return '↗️'
      return '↘️'

    def nameX():
      lis = []
      i=0
      while(i<len(data)):
        lis.append(str(code[data[i]['Ccy']])+str(data[i]['CcyNm_UZC']))
        i=i+1
      return lis
    def kursX():
      lis = []
      i=0
      while(i<len(data)):
        lis.append(str(data[i]['Rate'])+'   '+evnt(float(data[i]['Diff']))+str(data[i]['Diff']))
        i=i+1
      return lis
    def timeX():
      lis = []
      i=0
      while(i<len(data)):
        lis.append(data[i]['Date'])
        i=i+1
      return lis

    date = t.strftime('%Y-%m-%d', t.localtime())

    fig = go.Figure(data=[go.Table(
      header=dict(
        values=['<b>Валюта</b>','<b>КУРС</b>','<b>ЯНГИЛАНИШ</b>'],
        line_color='darkslategray',
        fill_color=headerColor,
        align=['left','center'],
        font=dict(color='white', size=12)
      ),
      cells=dict(
        values=[
          nameX(),
          kursX(),
          timeX()],
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
        height = 170,
        title_text= str(date) + '__Марказий банк курси___🇺🇿 СберкассаУз :@' + os.environ['NAME_BOT']
    )
    fig.write_image(src + '/images/center_bank.jpg')
    print('worked center_bank.py')