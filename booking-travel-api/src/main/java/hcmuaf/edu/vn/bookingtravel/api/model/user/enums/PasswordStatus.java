package hcmuaf.edu.vn.bookingtravel.api.model.user.enums;


import hcmuaf.edu.vn.bookingtravel.api.enums.utils.BaseEnum;

public enum PasswordStatus {
    NEW("Mới nhất"), OLD("Đã thay đổi"), CANCELLED("Đã hủy");
    private final String description;

    private PasswordStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }


    @Override
    public String toString() {
        return this.name();
    }
    public static String getListName() {
        StringBuilder listName = new StringBuilder();
        for (PasswordStatus status : values()) {
            listName.append(status.toString()).append(", ");
        }
        return listName.substring(0, listName.length() - 2);

    }
    public static boolean isExist(Object current) {
        return BaseEnum.isExist(values(), current);
    }


}
