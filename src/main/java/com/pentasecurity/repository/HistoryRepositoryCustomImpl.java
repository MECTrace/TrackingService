package com.pentasecurity.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.pentasecurity.dto.ConditionSearchDto;
import com.pentasecurity.entity.History;

@Repository
public class HistoryRepositoryCustomImpl implements HistoryRepositoryCustom{
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<History> findByConditional(ConditionSearchDto condition) {
		
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<History> q = cb.createQuery(History.class);
		Root<History> history = q.from(History.class);
		
		List<Predicate> res = new ArrayList<>();

		
		if(!StringUtils.isEmpty(condition.getTimeStampStart()) && !StringUtils.isEmpty(condition.getTimeStampEnd())) {
			res.add(
					cb.between(history.get("receivedTime"), condition.getTimeStampStart(), condition.getTimeStampEnd())
					);
					
		}

		if(!StringUtils.isEmpty(condition.getDeviceId())) {
			res.add(cb.equal(history.get("fromId"), condition.getDeviceId()));
		}
		if(!StringUtils.isEmpty(condition.getEdgeId())) {
			res.add(cb.equal(history.get("toId"), condition.getEdgeId()));
		}
		if(!StringUtils.isEmpty(condition.getDataFormat())) {
			res.add(cb.equal(history.get("master").get("dataFormat"), condition.getDataFormat()));
		}

		q.where(
				cb.and(
						res.toArray(new Predicate[res.size()])));
		
		TypedQuery<History> historyListQuery = entityManager.createQuery(q);


		//System.out.println("Query : " + boardListQuery.unwrap(org.hibernate.Query.class).getQueryString());
		
		//TODO: 여기가 오래걸림
		List<History> historyList = historyListQuery.getResultList();  
		

		
	
		return historyList;
	}
	

}
