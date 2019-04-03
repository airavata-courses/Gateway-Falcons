from crontab import CronTab

cron = CronTab(user=True)

iter1=cron.find_comment("add cardio data")
for job in iter1:
    cron.remove(job)
job = cron.new(command='curl -v http://149.165.168.185:30092/cardio_mood',comment='add cardio data')
job.setall('0 7 * * *')
cron.write()

iter1=cron.find_comment("add blood pressure data")
for job in iter1:
    cron.remove(job)
job = cron.new(command='curl -v http://149.165.168.185:30092/blood_pressure',comment='add blood pressure data')
job.setall('0 7 * * *')
cron.write()


