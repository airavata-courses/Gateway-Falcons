package hello;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UploadTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Test
    public void uploadSuccessfulTest() throws IOException {
        System.out.println(System.getProperty("user.dir"));
        File f = new File("src/test/java/hello/test.png");
        System.out.println(f.isFile()+"  "+f.getName()+f.exists());
        FileInputStream fi1 = new FileInputStream(f);
        MockMultipartFile fstmp = new MockMultipartFile("file", f.getName(), "multipart/form-data",fi1);


        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        try {
            MvcResult result = mockMvc.perform(MockMvcRequestBuilders.multipart("/upload")
                    .file(fstmp)
                    .param("data", "4"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("Upload Successful"))
                    .andReturn();

        } catch (Exception e) {
            e.printStackTrace();
        }
    } @Test
    public void uploadFailedTest() throws IOException {
        MockMultipartFile secondFile = new MockMultipartFile("file", "other-file-name.data", "text/plain", "some other type".getBytes());

        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        try {
            MvcResult result = mockMvc.perform(MockMvcRequestBuilders.multipart("/upload")
                    .file(secondFile)
                    .param("data", "4"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("Upload Failed"))
                    .andReturn();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
