from crontab import CronTab


cron = CronTab(user=True)
iter1=cron.find_comment("add diet data")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://149.165.168.185:30082/add',comment='add diet data')

job.setall('59 07-23/4 * * *')

cron.write()
