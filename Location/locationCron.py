from crontab import CronTab


cron = CronTab(user=True)
iter1=cron.find_comment("add location data")
for job in iter1:
    cron.remove(job)
job = cron.new(command='curl -v http://127.0.0.1:5006/getlocation',comment='add location data')

job.setall('*/1 * * * *')

cron.write()
