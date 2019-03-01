from crontab import CronTab


cron = CronTab(user=True)
job = cron.new(command='curl -v http://127.0.0.1:5000/add',comment='add diet data')

job.setall('0 08-12/4 * * *')

cron.write()
