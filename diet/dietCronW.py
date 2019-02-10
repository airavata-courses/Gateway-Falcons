from crontab import CronTab

cron = CronTab(tabfile='diet.tab')
job = cron.new(command='curl -v http://127.0.0.1:5000/add',comment='add diet data')

job.setall('*/5 * * * *')

cron.write()
