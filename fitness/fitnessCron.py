from crontab import CronTab


cron = CronTab(user=True)
job = cron.new(command='curl -v http://127.0.0.1:5001/get',comment='add fitness data')

job.setall('05 * * * *')

cron.write()
