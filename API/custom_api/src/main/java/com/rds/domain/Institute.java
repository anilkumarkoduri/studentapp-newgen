package com.rds.domain;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


/**
 * The persistent class for the rd_institute table.
 * 
 */
@Entity
@Table(name="rd_institute")
public class Institute implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "institute_id")
	private Integer instituteId;

	@NotNull
	@Column(name = "name", nullable = false)
	private String name;
	
    @Column(name = "description")
	private String description;
	
    @OneToOne(mappedBy = "institute")
	private User user;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "institute",cascade=CascadeType.ALL)
   	private Set<Student> student = new HashSet<Student>(0);
    
    @Column(name = "created_by")
	private Integer createdBy;

    @Column(name = "creation_date")
	private Timestamp creationDate;

	public Institute() {}

	public Integer getInstituteId() {
		return instituteId;
	}

	public void setInstituteId(Integer instituteId) {
		this.instituteId = instituteId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Student> getStudent() {
		return student;
	}

	public void setStudent(Set<Student> student) {
		this.student = student;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((instituteId == null) ? 0 : instituteId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Institute other = (Institute) obj;
		if (instituteId == null) {
			if (other.instituteId != null)
				return false;
		} else if (!instituteId.equals(other.instituteId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Institute [instituteId=" + instituteId + ", name=" + name + ", description=" + description + ", user="
				+ user + ", student=" + student + ", createdBy=" + createdBy + ", creationDate=" + creationDate + "]";
	}
}