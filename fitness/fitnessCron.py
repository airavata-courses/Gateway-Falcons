from crontab import CronTab


cron = CronTab(user=True)
iter1=cron.find_comment("add fitness data")
for job in iter1:
    cron.remove(job)
job = cron.new(command='curl -v http://149.165.168.185:30062/get',comment='add fitness data')

job.setall('59 8-23/1 * * *')

cron.write()
