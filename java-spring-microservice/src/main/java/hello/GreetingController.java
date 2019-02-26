package hello;

import com.cloudinary.Api;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.gson.Gson;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
@CrossOrigin
@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    private static final String CLOUDINARY_CLOUD_NAME = "XX";
    private static final String CLOUDINARY_API_KEY = "XX";
    private static final String CLOUDINARY_API_SECRET = "XX";

    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(value = "/upload", method = RequestMethod.POST,
            consumes = { "multipart/form-data"})
    public @ResponseBody
    String upload(@RequestParam(value = "file") MultipartFile file,
                  @RequestParam(value = "data") String data) {
        System.out.println("Xfile" + file.getOriginalFilename());
        Map config = new HashMap();
        config.put("cloud_name", CLOUDINARY_CLOUD_NAME);
        config.put("api_key", CLOUDINARY_API_KEY);
        config.put("api_secret", CLOUDINARY_API_SECRET);
        Cloudinary cloudinary = new Cloudinary(config);
        StringBuffer metadataString = new StringBuffer();
        Map<String, String> propertyMap = new HashMap<>();
        metadataString.append("title=").append(propertyMap.getOrDefault("title", ""))
                .append("|caption=").append(propertyMap.getOrDefault("caption", ""))
                .append("|alt=").append(propertyMap.getOrDefault("title", ""))
                .append("|location=").append(propertyMap.getOrDefault("location", "USA"))
                .append("|countryCode=").append(propertyMap.getOrDefault("countryCode", "+1"))
                .append("|copyright=").append(propertyMap.getOrDefault("copyright", ""))
                .append("|date=").append(propertyMap.getOrDefault("date", new Date().toString()))
                .append("|credit=").append(propertyMap.getOrDefault("credit", ""))
                .append("|lat=").append(propertyMap.getOrDefault("lat", ""))
                .append("|lng=").append(propertyMap.getOrDefault("lng", ""));

        metadataString.append("title=").append(data)
                .append("|caption=").append(data)
                .append("|alt=").append("x3");
        System.out.println(metadataString);
        Map params2 = ObjectUtils.asMap("use_filename", true,
                "unique_filename", true,
                "folder", "my_folder",
                "unique_filename", true,
                "context", metadataString.toString());

//        Map ObjectUtils.asMap params = (");
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), params2);
            System.out.println(uploadResult);
            return "Upload Successful";
        } catch (Exception e) {
            e.printStackTrace();
            return "Upload Failed";
        }

    }
    @CrossOrigin(origins = "http://localhost:8081")
    @RequestMapping(value = "/GetImages", method = RequestMethod.GET)
//    @RequestMapping(value = "/GetImages/{username}")
    public String getImages(@RequestParam("username") String username) {
        Map config = new HashMap();
        config.put("cloud_name", CLOUDINARY_CLOUD_NAME);
        config.put("api_key", CLOUDINARY_API_KEY);
        config.put("api_secret", CLOUDINARY_API_SECRET);
        Cloudinary cloudinary = new Cloudinary(config);
        Api api = cloudinary.api();
        try {
            Map params2 = ObjectUtils.asMap("use_filename", true,
                    "max_results", 20,
                    "context", "true",
                    "folder", username);
            Map result = api.resources(params2);
//            System.out.println(result.keySet());
//            System.out.println(result.values());
//            System.out.println(result.get("resources"));
//            JSONObject obj = new JSONObject(result.get("resources"));
//            String pageName = obj.getJSONObject("pageInfo").getString("pageName");
            List<Map<String, Object>> arrList = ((ArrayList) (result.get("resources")));
            Gson gson = new Gson();
            String json = gson.toJson(arrList);
            System.out.println("Json:" + json);
            return json;
        } catch (Exception e) {
            e.printStackTrace();
            return "Failure";
        }
//        return "Success";
    }

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {


        return new Greeting(counter.incrementAndGet(),
                String.format(template, name));

    }
}


