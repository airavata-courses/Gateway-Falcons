from crontab import CronTab

cron = CronTab(tabfile='fitness.tab')
job = cron.new(command=')
job = cron.new(command='curl -v http://127.0.0.1:5001/get',comment='add fitness data')

job.setall('*/5 * * * *')

cron.write()
