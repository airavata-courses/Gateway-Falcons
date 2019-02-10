from crontab import CronTab


mem_cron = CronTab(tab="""
  */5 * * * * curl -v http://127.0.0.1:5000/add
""")
job = mem_cron.new(command='curl -v http://127.0.0.1:5001/get',comment='add fitness data')

job.setall('*/5 * * * *')

mem_cron.write()
