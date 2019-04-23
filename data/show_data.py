from astropy.io import fits

file_name='FIRST_data.fit'
with fits.open(file_name) as hdul:
    hdul.info()
    count=0
    for data in hdul[1].data:
        print(str(count)+" "+str(data[0])+" "+str(data[1])+" "+str(data[2])+" "+str(data[3])+" "+str(data[4]))
        count+=1