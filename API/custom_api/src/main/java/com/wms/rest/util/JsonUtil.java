package com.wms.rest.util;

import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


/**
 * 
 * @author rds.
 *
 */

public class JsonUtil {

	private Gson gson = null;

	private static JsonUtil jsonUtil;

	public static JsonUtil getInstance() {
		if (jsonUtil == null)
			jsonUtil = new JsonUtil();
		return jsonUtil;
	}

	public JsonUtil() {
		gson = new GsonBuilder()
				.excludeFieldsWithModifiers(Modifier.VOLATILE)
				.create();
	}

	public String toJson(Object object) {
		//log.info("In toJson for object : "+ object);
		return gson.toJson(object);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object fromJson(String jsonString, Class class1) {
		return gson.fromJson(jsonString, class1);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Object fromJsonToList(String jsonString, Class object) {
		List<Object> objList = new ArrayList<Object>();
		try {
			JsonParser parser = new JsonParser();
			List<JsonElement> list = new ArrayList<JsonElement>();
			JsonArray jsonArray = (JsonArray) parser.parse(jsonString).getAsJsonArray();
			;
			if (jsonArray != null) {
				int len = jsonArray.size();
				for (int i = 0; i < len; i++) {
					list.add(jsonArray.get(i));
				}
			}

			if (list != null && list.size() > 0) {
				for (JsonElement jE : list) {
					JsonObject obj = jE.getAsJsonObject();
					Object object1 = gson.fromJson(obj, object);
					objList.add(object1);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return objList;
	}

}
