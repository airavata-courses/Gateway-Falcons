from crontab import CronTab


cron = CronTab(user=True)
job = cron.new(command='curl -v http://127.0.0.1:5000/add',comment='add diet data')

job.every(4).hours()

cron.write()
