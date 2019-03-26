from crontab import CronTab


cron = CronTab(user=True)
iter1=cron.find_comment("add diet data")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://127.0.0.1:5000/add',comment='add diet data')

job.setall('59 07-23/4 * * *')

cron.write()

iter1=cron.find_comment("add sleep data")
for job in iter1:
    cron.remove(job)

job = cron.new(command='curl -v http://127.0.0.1:5000/getsleep',comment='add sleep data')

job.setall('0 20 * * *')

cron.write()
