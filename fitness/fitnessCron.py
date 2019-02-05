from crontab import CronTab


cron = CronTab(user=True)
job = cron.new(command='curl -v http://127.0.0.1:5000/get',comment='add fitness data')

job.setall('59 8-23/1 * * *')

cron.write()