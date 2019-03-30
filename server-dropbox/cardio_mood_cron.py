from crontab import CronTab


cron = CronTab(user=True)
iter1=cron.find_comment("add location data")
for job in iter1:
    cron.remove(job)
job = cron.new(command='curl -v http://127.0.0.1:3003/cardio_mood',comment='add cardio data')

job.setall('*/1 * * * *')

cron.write()
