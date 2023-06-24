package hcmuaf.edu.vn.bookingtravel.api.client.model.bank;

import lombok.Data;

import java.util.Date;

/**
 * @author : Vũ Văn Minh
 * @mailto : duanemellow19@gmail.com
 * @created : 10/05/2023, Thứ Tư
 **/
@Data
public class RecordHistory {
    private int id;
    private String tid;
    private String description;
    private double amount;
    private String when;
    private String bankSubAccId;
}
