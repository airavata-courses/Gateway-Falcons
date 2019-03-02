from crontab import CronTab


cron = CronTab(user=True)
iter1=cron.find_comment("add diet data")
for job in iter1:
    cron.remove(job)
job = cron.new(command='curl -v http://127.0.0.1:5000/add',comment='add diet data')

job.setall('0 08-12/4 * * *')

cron.write()
