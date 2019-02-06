package com.wms.rest.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class RDSUtil {
	public static Timestamp getTimestampFromString(String startDate){
    	java.util.Date date = null;
		java.sql.Timestamp timeStamp = null;
    	try {
    		try {
				startDate=URLDecoder.decode(startDate,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			date = simpleDateFormat.parse(startDate);
			timeStamp = new java.sql.Timestamp(date.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	return timeStamp;
    }
	
	public static Date getDateFromString(String startDate){
    	java.util.Date date = null;
    	try {
    		try {
				startDate=URLDecoder.decode(startDate,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			date = simpleDateFormat.parse(startDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	return date;
    }
	
    /**
     * @return
     */
    public static Timestamp getTodayTimestamp() {
		java.util.Date date = null;
		java.sql.Timestamp timeStamp = null;
		try {
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			java.sql.Date dt = new java.sql.Date(calendar.getTimeInMillis());
			java.sql.Time sqlTime = new java.sql.Time(calendar.getTime()
					.getTime());
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			date = simpleDateFormat.parse(dt.toString() + " "+ sqlTime.toString());
			timeStamp = new java.sql.Timestamp(date.getTime());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return timeStamp;
	}
}
