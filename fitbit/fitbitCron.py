from crontab import CronTab

cron = CronTab(user=True)

iter1=cron.find_comment("add sleep data")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://127.0.0.1:5004/getsleep',comment='add sleep data')
job.setall('0 20 * * *')
cron.write()

iter1 = cron.find_comment("get heart rate")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://127.0.0.1:5004/getheartrate',comment='get heart rate')
job.setall('69 11 * * *')
cron.write()

iter1=cron.find_comment("get heart rate time series")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://127.0.0.1:5004/getstat',comment='get heart rate time series')
job.setall('0-59/1 * * * *')
cron.write()
