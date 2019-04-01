from crontab import CronTab

cron = CronTab(user=True)

iter1=cron.find_comment("add sleep data")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://149.165.168.185:30052/getsleep',comment='add sleep data')
job.setall('0 20 * * *')
cron.write()

iter1 = cron.find_comment("get heart rate")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://149.165.168.185:30052/getheartrate',comment='get heart rate')
job.setall('59 11 * * *')
cron.write()

iter1=cron.find_comment("get heart rate time series")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://149.165.168.185:30052/getstat',comment='get heart rate time series')
job.setall('0 */1 * * *')
cron.write()
