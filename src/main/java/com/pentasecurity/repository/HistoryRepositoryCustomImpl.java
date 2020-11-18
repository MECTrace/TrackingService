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
		/*
		CriteriaQuery<Tuple> query = cb.createTupleQuery();
		
		Root<History> h1 = query.from(History.class);
		Join<Master, History> t = h1.join("dataId", JoinType.INNER);
		query.multiselect(h1.alias("history"), t.alias("master"));
		
		if(!StringUtils.isEmpty(condition.getTimeStampStart()) && !StringUtils.isEmpty(condition.getTimeStampEnd())) {
			res.add(
					cb.between(h1.get("receivedTime"), condition.getTimeStampStart(), condition.getTimeStampEnd())
					);
					
		}
		if(!StringUtils.isEmpty(condition.getEventType())) {
			res.add(
					cb.equal(h1.get("trace"), condition.getEventType())
					
					);		
		}
		res.add(cb.or(cb.equal(h1.get("fromId"), condition.getDeviceId()),
				cb.equal(h1.get("fromId"), condition.getEdgeId()))
					);
		
		res.add(cb.equal(t.get("dataFormat"), condition.getDataFormat()));
		
		query.where(
				cb.and(
						res.toArray(new Predicate[res.size()])));
	

		TypedQuery<Tuple> query2 = entityManager.createQuery(query);

		List<Tuple> historyList = query2.getResultList();
	*/
		
		/*
		Predicate res = cb.equal(history.get("dataId"), "afe841dffec3e4c17202c221f035e71936811b34d54482d727ebab72ec9f7f65");
		cb.and(cb.be)
		*/
		
		if(!StringUtils.isEmpty(condition.getTimeStampStart()) && !StringUtils.isEmpty(condition.getTimeStampEnd())) {
			res.add(
					cb.between(history.get("receivedTime"), condition.getTimeStampStart(), condition.getTimeStampEnd())
					);
					
		}
		if(!StringUtils.isEmpty(condition.getEventType())) {
			res.add(
					cb.equal(history.get("trace"), condition.getEventType())
					
					);		
		}
		res.add(cb.or(cb.equal(history.get("fromId"), condition.getDeviceId()),
				cb.equal(history.get("fromId"), condition.getEdgeId()))
					);
		res.add(cb.equal(history.get("master").get("dataFormat"), condition.getDataFormat()));
		
		/*
		if(!StringUtils.isEmpty(condition.getDeviceId())) {
			res.add(
					cb.equal(history.get("from_id"), condition.getDeviceId())
					
					);		
		}
		
		if(!StringUtils.isEmpty(condition.getEdgeId())) {
			res.add(
					cb.equal(history.get("from_id"), condition.getDeviceId())
					
					);		
		}
		*/
		
		
		
		q.where(
				cb.and(
						res.toArray(new Predicate[res.size()])));
		
		
		
		TypedQuery<History> boardListQuery = entityManager.createQuery(q);

		List<History> historyList = boardListQuery.getResultList();
		
	
		return historyList;
	}
	

}
