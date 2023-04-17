package com.nexhub.databasemanager.model;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.nio.charset.Charset;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import static org.springframework.data.neo4j.core.schema.Relationship.Direction.INCOMING;


@Node
public class Resource {
    @Id
    @GeneratedValue
    private final long resourceId;
    @NotBlank
    @NotNull
    private String resourceName;
    @NotBlank
    @NotNull
    private String resourceDescription;
    @NotBlank
    @NotNull
    private String resBucketId;
    @NotBlank
    @NotNull
    private String resVisibility;

//    @Relationship(type = "OF_CATEGORY", direction = OUTGOING)
//    private Set<Category> resourceCategory = new HashSet<>();
    @Relationship(type = "HAS_A", direction = INCOMING )
    private Set<User> resourceHolders = new HashSet<>();

//    public Resource(@NotNull long resourceId,
//                    @NotNull String resourceName,
//                    String resourceDescription,
//                    ResVisibility resVisibility) {
//        this.resourceId = resourceId;
//        this.resourceName = resourceName;
//        this.resourceDescription = resourceDescription;
//        this.resBucketId = resourceBucketIdGenerator();
//        this.resVisibility = (resVisibility == null)? ResVisibility.PRIVATE : resVisibility;
//    }
    public Resource(long resourceId, String resourceName, String resourceDescription, String resBucketId, String resVisibility) {
        this.resourceId = resourceId;
        this.resourceName = resourceName;
        this.resourceDescription = resourceDescription;
        this.resBucketId = resBucketId;
        this.resVisibility = resVisibility;
    }

    private String resourceBucketIdGenerator(){
        String resName = this.resourceName;
        // Salt generation
        byte[] array = new byte[15];
        new Random().nextBytes(array);
        String salt = new String(array, Charset.forName("UTF-8"));
        // result string
        String result = resName+salt;
        result = resName+"-"+Math.abs(result.hashCode());
        return result;
    }
    public void addHolder(User u){
        resourceHolders.add(u);
    }

    public long getResourceId() {
        return resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getResBucketId() {
        return resBucketId;
    }

    public String getResVisibility() {
        return resVisibility;
    }

    public Set<User> getResourceHolders() {
        return resourceHolders;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public void setResVisibility(String resVisibility) {
        this.resVisibility = resVisibility;
    }

    public void setResBucketId(String resBucketId) {
        this.resBucketId = resBucketId;
    }

    public void setResourceHolders(Set<User> resourceHolders) {
        this.resourceHolders = resourceHolders;
    }

    @Override
    public String toString() {
        return "Resource{" +
                "resourceId=" + resourceId +
                ", resourceName='" + resourceName + '\'' +
                ", resBucketId='" + resBucketId + '\'' +
                ", resVisibility=" + resVisibility +
                ", resourceHolders=" + resourceHolders +
                '}';
    }

    public String getResourceDescription() {
        return resourceDescription;
    }

    public void setResourceDescription(String resourceDescription) {
        this.resourceDescription = resourceDescription;
    }
}
